export class PagedApiResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  data: T[];

  constructor(obj?: PagedApiResponse<T>) {
      this.pageNumber = obj ? obj.pageNumber : this.pageNumber;
      this.totalPages = obj ? obj.totalPages : this.totalPages;
      this.totalRecords = obj ? obj.totalRecords : this.totalRecords;
      this.pageSize = obj ? obj.pageSize : this.pageSize;
      this.data = obj ? obj.data : this.data;
  }
}

export class PaginationRequest {
  isPaginationRequest: boolean = true;
  pageNumber: number = 0;
  pageSize: number = 5;
  constructor(config?: { pageNumber: number, pageSize: number }) {
    this.pageNumber = config ? config.pageNumber : this.pageNumber;
    this.pageSize = config ? config.pageSize : this.pageSize;
  }
}
