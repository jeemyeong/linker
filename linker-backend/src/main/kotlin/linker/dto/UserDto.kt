package linker.dto

import linker.entity.Board
import linker.entity.User

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:43 PM
 */
data class UserDto(
        var id: Long,
        var email: String
) {
    var boards: Collection<Board>? = null
    fun toDomain(boards: List<Board>): User = User(
            id = id,
            email = email
    )
    companion object {
        fun fromDomain (user: User): UserDto = UserDto(
                id = user.id,
                email = user.email
        )
    }
}
