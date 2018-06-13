package linker.ui.user

import com.fasterxml.jackson.annotation.JsonInclude
import linker.domain.user.User

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 14/06/2018
 * Time: 1:24 AM
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
data class UserDto(
        val id: Long,
        val email: String,
        val googleId: String?,
        val name: String?,
        val link: String?,
        val locale: String?,
        val picture: String?
) {
    companion object {
        fun fromDomain(user: User) = UserDto(
                id = user.id,
                email = user.email,
                googleId = user.googleId,
                name = user.name,
                link = user.link,
                locale = user.locale,
                picture = user.picture
        )
    }
}