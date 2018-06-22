package linker.infra.helper

import io.jsonwebtoken.*
import linker.infra.auth.Role
import linker.infra.exceptions.TokenException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.web.util.WebUtils
import java.util.*
import javax.servlet.http.HttpServletRequest


/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 18/06/2018
 * Time: 1:03 AM
 */
@Component
class SignHelper {
    @Autowired
    lateinit var request: HttpServletRequest

    private val secretKey: String = "linkerSecretKey"
    private val validityInMilliseconds: Long = 3600000 // 1h

    fun createToken(userId: Long, roles: List<Role>): String {

        val claims = Jwts.claims().setId(userId.toString())
        claims["auth"] = roles

        val now = Date()
        val validity = Date(now.time + validityInMilliseconds)

        return Jwts.builder()//
                .setClaims(claims)//
                .setIssuedAt(now)//
                .setExpiration(validity)//
                .signWith(SignatureAlgorithm.HS256, secretKey)//
                .compact()
    }

    fun checkTokenExpired() {
        resolveToken()
    }

    fun getUserId(): Long {
        return resolveToken().body.id.toLong()
    }

    fun resolveToken(): Jws<Claims> {
        try {
            return Optional.ofNullable(WebUtils.getCookie(request, "JWT")).map { it.value }
                    .orElseThrow { TokenException("There is no JWT token") }
                    .let { Jwts.parser().setSigningKey(secretKey).parseClaimsJws(it) }
        } catch (e: JwtException) {
            throw TokenException("Expired or invalid JWT token")
        } catch (e: IllegalArgumentException) {
            throw TokenException("Expired or invalid JWT token")
        }
    }
}