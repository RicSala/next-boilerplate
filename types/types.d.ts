export type HttpStatusCode = 200 | 201 | 400 | 401 | 404 | 500; // Extend as needed

export type PaginationInfo = {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
};

//   Utility type: Make a specific property nullable
export type MakeNullable<T, K extends keyof T> = Omit<T, K> & // First we ommit the whole property
    Partial<Pick<T, K>>; // Then we add it as a partial property

export type ChildrenProps = {
    children: React.ReactNode;
};

export type AuthContextProps = {
    isLoggedIn: Boolean;
    user: any; // TODO: temporal
};

export type Post = {
    slug: string;
    title: string;
    published: boolean;
    tags: string[];
    date: string;
};

export type ApiResponse<T = undefined, E = ApiError> =
    | {
          statusCode: HttpStatusCode;
          message: string;
          data: T | undefined;
          ok: true;
          meta?: any; // Additional metadata
          pagination?: PaginationInfo;
      }
    | {
          statusCode: HttpStatusCode;
          message: string;
          ok: false;
          error: E;
          meta?: any; // Additional metadata
      };

export type ApiRequestBody<
    T = undefined,
    A = 'CREATE' | 'UPDATE' | 'DELETE' | 'INVITE' | 'EXIT'
> = {
    data: T;
    action: A;
};

export type TStatus = 'idle' | 'loading' | 'success' | 'error';
