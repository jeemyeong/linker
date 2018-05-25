package linker.dto

import com.fasterxml.jackson.annotation.JsonInclude
import linker.entity.Board
import linker.entity.Category
import linker.entity.Link

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:40 PM
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
data class CategoryDto(
        var id: Long,
        var title: String,
        val order: Int,
        var links: Collection<LinkDto>? = null,
        var board: BoardDto? = null
) {
    fun toDomain(board: Board, links: List<Link>): Category = Category(
            id = id,
            title = title,
            order = order,
            board = board,
            links = links
    )
    companion object {
        fun fromDomain(category: Category, links: List<LinkDto>? = null, board: BoardDto? = null): CategoryDto = CategoryDto(
                id = category.id,
                title = category.title,
                order = category.order,
                links = links,
                board = board
        )
    }
}