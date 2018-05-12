package linker.dto

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
    companion object
}

fun UserDto.toDomain(): User = User(
        id = id,
        email = email
)
fun UserDto.Companion.fromDomain (user: User): UserDto = UserDto(
        id = user.id,
        email = user.email
)