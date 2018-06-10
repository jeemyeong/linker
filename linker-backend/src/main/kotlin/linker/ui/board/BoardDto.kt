package linker.ui.board

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonInclude
import linker.domain.board.Board
import linker.domain.board.Category
import linker.domain.board.Link

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 29/05/2018
 * Time: 12:48 AM
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
data class BoardDto(
        var id: Long,
        var title: String,
        var categories: List<CategoryVO>
) {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    data class CategoryVO(
            var id: Long,
            var title: String,
            @JsonIgnore var order: Int,
            var links: List<LinkVO>
    ) {
        @JsonInclude(JsonInclude.Include.NON_NULL)
        data class LinkVO(
                var id: Long,
                var url: String,
                var content: String,
                @JsonIgnore var order: Int,
                var ogTitle: String?,
                var ogImage: String?,
                var ogDescription: String?
        ) {
            companion object {
                fun fromDomain(link: Link) = LinkVO(
                        id = link.id,
                        url = link.url,
                        content = link.content,
                        order = link.order,
                        ogTitle = link.ogTitle,
                        ogImage = link.ogImage,
                        ogDescription = link.ogDescription
                )
            }
        }
        companion object {
            fun fromDomain(category: Category) = CategoryVO(
                    id = category.id,
                    title = category.title,
                    order = category.order,
                    links = category.links.map{LinkVO.fromDomain(it)}.sortedBy { it.order }
            )
        }
    }

    companion object {
        fun fromDomain(board: Board) = BoardDto(
                id = board.id,
                title = board.title,
                categories = board.categories.map { CategoryVO.fromDomain(it) }.sortedBy { it.order }
        )
    }

}
