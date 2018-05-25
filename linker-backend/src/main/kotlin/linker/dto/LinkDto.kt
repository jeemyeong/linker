package linker.dto

import linker.entity.Category
import linker.entity.Link
import linker.entity.User

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:41 PM
 */
data class LinkDto(
        var id: Long,
        var url: String,
        var content: String,
        var order: Int,
        var ogImage: String?,
        var ogTitle: String?,
        var ogDescription: String?
) {
    var category :CategoryDto? = null
    var user :UserDto? = null
    fun toDomain(category: Category, user: User): Link = Link(
            id = id,
            url = url,
            content = content,
            category = category,
            user = user,
            order = order,
            ogTitle = ogTitle,
            ogImage = ogImage,
            ogDescription = ogDescription
    )
    companion object {
        fun fromDomain(link: Link): LinkDto = LinkDto(
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

