package linker.dto

import com.fasterxml.jackson.annotation.JsonInclude
import linker.entity.Board
import linker.entity.User

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:43 PM
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
data class UserDto(
        var id: Long,
        var email: String,
        var boards: Collection<BoardDto>? = null
) {
    fun toDomain(boards: List<Board>): User = User(
            id = id,
            email = email,
            boards = boards
    )
    companion object {
        fun fromDomain (user: User, boards: List<BoardDto>? = null): UserDto = UserDto(
                id = user.id,
                email = user.email,
                boards = boards
        )
    }
}
