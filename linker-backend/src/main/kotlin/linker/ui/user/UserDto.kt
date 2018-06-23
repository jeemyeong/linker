package linker.ui.user

import com.fasterxml.jackson.annotation.JsonInclude
import linker.domain.board.Board
import linker.domain.user.User
import linker.ui.board.BoardDto

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
        val picture: String?,
        val provider: String?,
        val role: String?,
        val boards: List<BoardDto>?
) {
    companion object {
        fun fromDomain(user: User, boards: List<Board>? = null) = UserDto(
                id = user.id,
                email = user.email,
                googleId = user.googleId,
                name = user.name,
                link = user.link,
                locale = user.locale,
                picture = user.picture,
                provider = user.provider,
                role = user.role,
                boards = boards?.map { BoardDto.fromDomain(it) }
        )
    }
}