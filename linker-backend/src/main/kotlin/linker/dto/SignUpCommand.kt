package linker.dto

import linker.entity.Board
import linker.entity.User

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:43 PM
 */
data class SignUpCommand(val email: String) {
    fun toDomain(boards: List<Board>): User = User(email = email)
}
