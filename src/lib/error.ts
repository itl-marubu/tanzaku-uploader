import { isNotFoundError } from 'next/dist/client/components/not-found'

export class HTTPError extends Error {
  public readonly status: number
  public readonly message: string
  public readonly url: string
  public get cause() {
    return this.#cause
  }

  #cause?: Record<string, unknown>

  constructor(response: Response, cause?: Record<string, unknown>) {
    super(response.statusText)
    this.status = response.status
    this.message = response.statusText
    this.url = response.url
    this.#cause = cause
  }
}

export const isHTTPError = (error: unknown): error is HTTPError => {
  return error instanceof HTTPError
}

export const isClientError = (error: unknown): error is HTTPError => {
  if (!isHTTPError(error)) {
    return false
  }

  switch (error.status) {
    case 400:
    case 401:
    case 403:
    case 404:
      return true
    default:
      return false
  }
}

export const isNotFound = (error: unknown): error is HTTPError => {
  if (isNotFoundError(error)) {
    return true
  }

  if (!isHTTPError(error)) {
    return false
  }

  switch (error.status) {
    case 401:
    case 403:
    case 404:
      return true
    default:
      return false
  }
}

export const isServerError = (error: unknown): error is HTTPError => {
  if (!isHTTPError(error)) {
    return false
  }

  switch (error.status) {
    case 500:
      return true
    default:
      return false
  }
}
