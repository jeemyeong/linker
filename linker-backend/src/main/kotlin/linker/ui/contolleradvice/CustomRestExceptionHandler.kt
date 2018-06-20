package linker.ui.contolleradvice

import linker.infra.exceptions.ApiError
import linker.infra.exceptions.InternalException
import linker.infra.exceptions.TokenException
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.context.request.WebRequest
import java.net.MalformedURLException
import javax.validation.ConstraintViolationException

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 13/05/2018
 * Time: 9:15 PM
 */
@ControllerAdvice
class CustomRestExceptionHandler {
    @ExceptionHandler(ConstraintViolationException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    fun handleConstraintViolation(ex: ConstraintViolationException, request: WebRequest): ResponseEntity<ApiError> {
        val errors = ex.constraintViolations.map { violation -> violation.rootBeanClass.name + " " + violation.propertyPath + " " + violation.message }
        val apiError = ApiError(HttpStatus.BAD_REQUEST, ex.localizedMessage, errors)
        return ResponseEntity(apiError, HttpHeaders(), apiError.status)
    }

    @ExceptionHandler(MalformedURLException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    fun handleMalformedURL(ex: MalformedURLException, request: WebRequest): ResponseEntity<ApiError> {
        val error = ex.localizedMessage + " " + ex.message + " "
        val apiError = ApiError(HttpStatus.BAD_REQUEST, ex.localizedMessage, listOf(error))
        return ResponseEntity(apiError, HttpHeaders(), apiError.status)
    }

    @ExceptionHandler(TokenException::class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    fun handleUnauthorizedError(ex: TokenException, request: WebRequest): ResponseEntity<ApiError> {
        val error = ex.localizedMessage + " " + ex.message + " "
        val apiError = ApiError(HttpStatus.UNAUTHORIZED, ex.localizedMessage, listOf(error))
        return ResponseEntity(apiError, HttpHeaders(), apiError.status)
    }

    @ExceptionHandler(InternalException::class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    fun handleInternalServerError(ex: InternalException, request: WebRequest): ResponseEntity<ApiError> {
        val error = ex.localizedMessage + " " + ex.message + " "
        val apiError = ApiError(HttpStatus.INTERNAL_SERVER_ERROR, ex.localizedMessage, listOf(error))
        return ResponseEntity(apiError, HttpHeaders(), apiError.status)
    }
}