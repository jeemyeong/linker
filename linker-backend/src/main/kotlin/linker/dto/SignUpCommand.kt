package linker.dto

import linker.entity.User

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:43 PM
 */
data class SignUpCommand(val email: String)

fun SignUpCommand.toDomain(): User = User(email = email)