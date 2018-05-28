package linker.presentation.board

import com.fasterxml.jackson.annotation.JsonInclude
import linker.entity.Board
import linker.entity.Category
import linker.entity.Link
import linker.entity.User

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 29/05/2018
 * Time: 12:48 AM
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
data class BoardDto(
        var id: Long?,
        var title: String?,
        var user: UserDto?,
        var categories: List<CategoryDto>?
) {
    data class UserDto(
            var email: String?
    ) {
        companion object {
            fun fromDomain(user: User?) = UserDto(
                    email = user?.email
            )
        }
    }

    data class CategoryDto(
            var id: Long?,
            var title: String?,
            var order: Int?,
            var boardId: Long?,
            var links: List<LinkDto>?
    ) {
        data class LinkDto(
                var id: Long?,
                var url: String?,
                var content: String?,
                var order: Int?,
                var ogTitle: String?,
                var ogImage: String?,
                var ogDescription: String?,
                var categoryId: Long?,
                var userId: Long?
        ) {
            companion object {
                fun fromDomain(link: Link) = LinkDto(
                        id = link.id,
                        url = link.url,
                        content = link.url,
                        order = link.order,
                        ogTitle = link.ogTitle,
                        ogImage = link.ogImage,
                        ogDescription = link.ogDescription,
                        categoryId = link.categoryId,
                        userId = link.userId
                )
            }
        }
        companion object {
            fun fromDomain(category: Category) = CategoryDto(
                    id = category.id,
                    title = category.title,
                    order = category.order,
                    boardId = category.boardId,
                    links = category.links?.map{LinkDto.fromDomain(it)}
            )
        }
    }

    companion object {
        fun fromDomain(board: Board, user: User?) = BoardDto(
                id = board.id,
                title = board.title,
                user = UserDto.fromDomain(user),
                categories = board.categories?.map { CategoryDto.fromDomain(it) }
        )
    }

}