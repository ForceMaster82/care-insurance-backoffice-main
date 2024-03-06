export const httpStatus = {
  /**@description 409 Conflict. 서버의 현재 상태와 요청이 충돌했음을 나타낸다. 충돌은 PUT 요청에 대응하여 발생할 가능성이 가장 높다. 예를 들어 서버에 이미 있는 파일보다 오래된 파일을 업로드할 때 409 응답이 발생하여 버전 제어 충돌이 발생할 수 있다. */
  conflict: 409,

  /**@description 500 Internal Server Error. 요청을 처리하는 과정에서 서버가 예상하지 못한 상황에 놓였다는 것을 나타냅니다. 이 에러 응답은 서버 에러를 총칭하는"(catch-all) 구체적이지 않은 응답입니다.  */
  internalServerError: 500,

  /**@description 401 Unauthorized. 해당 리소스에 유효한 인증 자격 증명이 없기 때문에 요청이 적용되지 않았음을 나타냅니다.  403과 비슷하지만, 401 Unauthorized의 경우에는 인증이 가능합니다. */
  unauthorized: 401,
}
