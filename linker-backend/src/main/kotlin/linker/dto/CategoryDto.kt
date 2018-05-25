package linker.dto

import linker.entity.Board
import linker.entity.Category

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:40 PM
 */
data class CategoryDto(
        var id: Long,
        var title: String,
        val order: Int
) {
    var links: Collection<LinkDto>? = null
    var board: BoardDto? = null
    fun toDomain(board: Board): Category = Category(
            id = id,
            title = title,
            order = order,
            board = board
    )
    companion object {
        fun fromDomain(category: Category): CategoryDto = CategoryDto(
                id = category.id,
                title = category.title,
                order = category.order
        )
    }
}