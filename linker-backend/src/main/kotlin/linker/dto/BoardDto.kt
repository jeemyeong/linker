package linker.dto

import com.fasterxml.jackson.annotation.JsonInclude
import linker.entity.Board
import linker.entity.Category
import linker.entity.User

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 25/05/2018
 * Time: 9:34 PM
 */

@JsonInclude(JsonInclude.Include.NON_NULL)
data class BoardDto(
        var id: Long,
        var title: String,
        var categories: List<CategoryDto>? = null,
        var user: UserDto? = null
) {
    fun toDomain(user: User, categories: List<Category>): Board = Board(
            id = id,
            title = title,
            user = user,
            categories = categories
    )
    companion object {
        fun fromDomain(board: Board, categories: List<CategoryDto>? = null, user: UserDto? = null): BoardDto = BoardDto(
                id = board.id,
                title = board.title,
                categories = categories,
                user = user
        )
    }
}
