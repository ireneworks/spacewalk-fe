import Filter from "../../components/filter/Filter";
import Sort from "../../components/sort/Sort";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import ReactPaginate from "react-paginate";
import leftGrey from "assets/icons/chevronLeftGrey.png";
import rightGrey from "assets/icons/chevronRightGrey.png";
import { getIssue } from "../../apis/getIssue";
import { useSearchParams } from "react-router-dom";

export default function IssueList() {
  const componentMounted = useRef(false);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPages] = useState(1);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (componentMounted.current) {
      (async function () {
        const params = { filter, sort, page };
        const response = await getIssue(params);
        if (response.isSuccess) {
          setIssues(response.data.contents);
          setTotalPages(response.data.totalPages);
          setSearchParams({ state: filter, sort, page: String(page) });
        } else {
          alert(response.errorMessage);
        }
      })();
    }
  }, [filter, sort, page]);

  useEffect(() => {
    const filter = searchParams.get("state") ?? "all";
    const sort = searchParams.get("sort") ?? "created";
    const page = searchParams.get("page") ?? 1;

    setFilter(filter);
    setSort(sort);
    setPage(Number(page));

    componentMounted.current = true;
  }, []);

  return (
    <Container>
      <Candidate>박지윤</Candidate>
      <Title>이슈정리</Title>
      <Wrapper>
        <Filter
          selected={filter}
          onApply={setFilter}
          options={[
            { text: "전체", value: "all", overrideText: "이슈 상태" },
            { text: "open", value: "open" },
            { text: "closed", value: "closed" },
          ]}
        />
        <Sort
          selected={sort}
          onApply={setSort}
          options={[
            { text: "작성일 순", value: "created" },
            { text: "수정일 순", value: "updated" },
            { text: "코멘트 순", value: "comments" },
          ]}
        />
      </Wrapper>
      <Table>
        <TableHeader>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>수정일</th>
            <th>코멘트 수</th>
          </tr>
        </TableHeader>
        <tbody>
          {issues.length ? (
            issues.map((issue: any) => (
              <tr key={issue.id}>
                <td>{issue.number}</td>
                <td>{issue.title}</td>
                <td>{issue.user.login}</td>
                <td>{dayjs(issue.created_at).format("YYYY-MM-DD")}</td>
                <td>{dayjs(issue.updated_at).format("YYYY-MM-DD")}</td>
                <td>{issue.comments}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>없거나 로딩중</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination
        breakLabel={false}
        marginPagesDisplayed={0}
        pageLinkClassName={"number"}
        forcePage={page - 1}
        onPageChange={({ selected }) => setPage(selected + 1)}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        nextLabel=""
        previousLabel=""
      />
    </Container>
  );
}

const Container = styled.div`
  width: 1080px;
  padding: 72px 60px;
`;

const Candidate = styled.h2`
  margin: 0 0 12px 0;
  padding: 0 20px;
  color: #7b848c;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const Title = styled.h1`
  margin: 0 20px 0;
  padding: 32px 0 0;
  border-top: 1px solid #dfe5eb;
  color: #14171a;
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 20px 0;
`;

const Table = styled.table`
  min-width: 1080px;
  width: 100%;
  padding: 24px 20px 0;
  border-spacing: 0;
  text-align: left;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: #5a6066;

  tbody {
    &:before {
      line-height: 8px;
      content: ".";
      color: #fff;
      display: block;
    }
    tr {
      &:hover {
        background-color: #f5f8fa;
        cursor: pointer;
      }
    }
  }

  th:nth-child(1) {
    width: 60px;
    padding: 6px 20px 6px 12px;
  }
  td:nth-child(1) {
    width: 60px;
    padding: 8px 20px 8px 12px;
  }

  th:nth-child(2) {
    max-width: 421px;
    padding: 6px 20px 6px 0;
  }
  td:nth-child(2) {
    max-width: 421px;
    padding: 8px 20px 8px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  th:nth-child(3) {
    width: 120px;
    padding: 8px 20px 8px 0;
  }
  td:nth-child(3) {
    width: 120px;
    padding: 6px 20px 6px 0;
  }

  th:nth-child(4),
  th:nth-child(5) {
    width: 90px;
    padding: 6px 20px 6px 0;
    text-align: center;
  }
  td:nth-child(4),
  td:nth-child(5) {
    width: 90px;
    padding: 8px 20px 8px 0;
    text-align: center;
  }

  th:nth-child(6) {
    width: 60px;
    text-align: right;
    padding: 6px 12px 6px 0;
  }
  td:nth-child(6) {
    width: 60px;
    text-align: right;
    padding: 8px 12px 8px 0;
  }
`;

const TableHeader = styled.thead`
  background: #f5f8fa;

  th {
    font-weight: 500;
  }

  th:first-child {
    border-radius: 8px 0 0 8px;
  }
  th:last-child {
    border-radius: 0 8px 8px 0;
  }
`;

const Pagination = styled(ReactPaginate)`
  display: flex;
  gap: 8px;
  align-content: center;
  justify-content: center;
  margin-top: 24px;

  .previous {
    width: 36px;
    height: 36px;
    background: url(${leftGrey}) center / 24px no-repeat;
    cursor: pointer;
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .next {
    width: 36px;
    height: 36px;
    background: url(${rightGrey}) center / 24px no-repeat;
    cursor: pointer;
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  li {
    .number {
      display: flex;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      font-weight: 700;
      color: #7b848c;
      font-size: 16px;
      line-height: 24px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
    }
    &.selected {
      .number {
        color: #14171a;
        background-color: #f0f4f7;
      }
    }
  }
`;
