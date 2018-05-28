package linker.dto

import com.fasterxml.jackson.annotation.JsonInclude
import linker.entity.Board
import linker.entity.Category

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 25/05/2018
 * Time: 9:34 PM
 */

@JsonInclude(JsonInclude.Include.NON_NULL)
data class BoardDto(
        var id: Long?,
        var title: String?,
        var categories: List<Category>? = null,
        var user: UserDto? = null
) {
    fun toDomain(categories: List<Category>): Board = Board(
            id = id ?: 0,
            title = title,
            userId = user?.id,
            categories = categories
    )
    companion object {
        fun fromDomain(board: Board, user: UserDto): BoardDto = BoardDto(
                id = board.id,
                title = board.title,
                categories = board.categories,
                user = user
        )
    }
}
