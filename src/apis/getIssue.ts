import { request } from "./config/config";
import { AxiosError } from "axios";

interface IssueRequest {
  state?: string;
  sort?: string;
  page?: number;
  per_page?: number;
}

interface IssueResponse {
  contents: Issue[];
  totalPages: number;
}

export async function getIssue({
  per_page = 10,
  ...params
}: IssueRequest): Promise<WebResponse<IssueResponse>> {
  try {
    const response = await request.get("/repos/facebook/react/issues", {
      params: { per_page: 10 },
    });

    // header에서 totalPages 추출
    const targetString = response.headers.link
      .split(",")
      .find((str: string) => str.includes("last"));
    const found = (targetString || "").match(/([?&])page=(?<page>\d+)/i);

    return {
      isSuccess: true,
      data: {
        contents: response.data,
        totalPages: found?.groups.page ?? params.page,
      },
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      return {
        isSuccess: false,
        errorMessage: e.response?.data.message,
      };
    }
    return {
      isSuccess: false,
      errorMessage: "네트워크 요청에 실패했습니다.",
    };
  }
}
