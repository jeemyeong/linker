package linker.dto

import linker.entity.Board
import linker.entity.Category
import linker.entity.Link

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 14/05/2018
 * Time: 11:40 PM
 */
data class UpdateCategoryCommand(
        val id: Long,
        val title: String,
        val boardId: Long,
        val order: Int
) {
    fun toDomain(board: Board, links: List<Link>): Category = Category(
            id = id,
            title = title,
            boardId = board.id,
            order = order,
            links = links
    )
}