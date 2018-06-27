package linker.infra.rest

import linker.infra.exceptions.InternalException
import org.springframework.http.*
import org.springframework.stereotype.Component
import java.util.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 14/06/2018
 * Time: 12:58 AM
 */

@Component
class GoogleOAuthRestManager: RestManager() {

    private fun getCommonHeader(googleToken: String): HttpHeaders {
        val headers = HttpHeaders()
        headers.accept = Arrays.asList(MediaType.APPLICATION_JSON)
        headers.set(HttpHeaders.AUTHORIZATION, "Bearer $googleToken")
        return headers
    }

    fun getProfileFromGoogle(googleToken: String): GoogleOAuthResponse {
        val headers = getCommonHeader(googleToken)
        headers.contentType = MediaType.APPLICATION_FORM_URLENCODED
        val entity = HttpEntity<Any>(headers)
        val result: ResponseEntity<GoogleOAuthResponse> = execute("https://www.googleapis.com/userinfo/v2/me", HttpMethod.GET, entity, GoogleOAuthResponse::class.java)
        return Optional.ofNullable(result.body).orElseThrow { InternalException("Empty response from google") }
    }
}

data class GoogleOAuthResponse(
        val email: String,
        val name: String?,
        val id: String?,
        val link: String?,
        val locale: String?,
        val picture: String?
)