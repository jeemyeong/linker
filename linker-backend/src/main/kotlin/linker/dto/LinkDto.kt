package linker.dto

import com.fasterxml.jackson.annotation.JsonInclude
import linker.entity.Category
import linker.entity.Link
import linker.entity.User

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:41 PM
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
data class LinkDto(
        var id: Long?,
        var url: String?,
        var content: String?,
        var order: Int?,
        var ogImage: String?,
        var ogTitle: String?,
        var ogDescription: String?,
        var category :CategoryDto?,
        var user :UserDto?
) {
    fun toDomain(category: Category, user: User): Link = Link(
            id = id ?: 0,
            url = url,
            content = content,
            categoryId = category.id,
            userId = user.id,
            order = order,
            ogTitle = ogTitle,
            ogImage = ogImage,
            ogDescription = ogDescription
    )
    companion object {
        fun fromDomain(link: Link, category: CategoryDto? = null, user: UserDto? = null): LinkDto = LinkDto(
                id = link.id,
                url = link.url,
                content = link.content,
                order = link.order,
                ogTitle = link.ogTitle,
                ogImage = link.ogImage,
                ogDescription = link.ogDescription,
                category = category,
                user = user
        )
    }
}

