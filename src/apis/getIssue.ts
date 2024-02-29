import { request } from "./config/config";
import { AxiosError } from "axios";

interface IssueRequest {
  filter?: string;
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
      params: {
        per_page,
        state: params.filter ? params.filter : undefined, // 이니셜 fetch 때 parameter 제외
        sort: params.sort ? params.sort : undefined,
        ...params,
      },
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
        totalPages: Number(found?.groups.page) ?? params.page, // 마지막 페이지인 경우 현재 페이지 반환
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
      errorMessage: "다시 시도해주세요.",
    };
  }
}
