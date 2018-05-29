package linker.app.board

import linker.domain.board.Board
import linker.domain.board.Category
import linker.domain.board.Link
import linker.domain.user.User


/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 29/05/2018
 * Time: 10:51 PM
 */

sealed class BoardCommand {
    class UpdateBoard(val id: Long, val board: BoardVO)
}

data class BoardVO(
        var id: Long,
        var title: String,
        var categories: List<CategoryVO>
) {
    data class CategoryVO(
            var id: Long,
            var title: String,
            var links: List<LinkVO>
    ) {
        data class LinkVO(
                var id: Long,
                var url: String,
                var content: String,
                var ogTitle: String?,
                var ogImage: String?,
                var ogDescription: String?,
                var userId: Long
        ) {
            fun toDomain(category: CategoryVO, user: User): Link = Link(
                    id = id,
                    url = url,
                    content = content,
                    order = 0,
                    ogTitle = ogTitle,
                    ogImage = ogImage,
                    ogDescription = ogDescription,
                    categoryId = category.id,
                    userId = user.id
            )
        }

        fun toDomain(board: BoardVO, user: User): Category = Category(
                id = id,
                title = title,
                order = 0,
                boardId = board.id,
                links = links.map { it.toDomain(this, user) }
        )
    }
    fun toDomain(user: User): Board = Board(
            id = id,
            title = title,
            userId = user.id,
            categories = categories.map { it.toDomain(this, user) }
    )

}