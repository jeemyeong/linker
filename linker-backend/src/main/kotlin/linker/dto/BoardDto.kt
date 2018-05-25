package linker.dto

import linker.entity.Board
import linker.entity.User

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 25/05/2018
 * Time: 9:34 PM
 */

data class BoardDto(
        var id: Long,
        var title: String
) {
    var categories: Collection<CategoryDto>? = null
    var user: UserDto? = null

    fun toDomain(user: User): Board = Board(
            id = id,
            title = title,
            user = user
    )
    companion object {
        fun fromDomain(board: Board): BoardDto = BoardDto(
            id = board.id,
            title = board.title
        )

    }
}
