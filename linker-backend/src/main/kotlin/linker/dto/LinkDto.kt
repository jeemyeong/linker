package linker.dto

import linker.entity.Link

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
        var category: CategoryDto,
        var order: Int,
        var ogImage: String?,
        var ogTitle: String?
) {
    companion object
}

fun LinkDto.toDomain(): Link = Link(
        id = id,
        url = url,
        content = content,
        category = category.toDomain(),
        order = order,
        ogTitle = ogTitle,
        ogImage = ogImage
)
fun LinkDto.Companion.fromDomain(link: Link): LinkDto = LinkDto(
        id = link.id,
        url = link.url,
        content = link.content,
        category = CategoryDto.fromDomain(link.category),
        order = link.order,
        ogTitle = link.ogTitle,
        ogImage = link.ogImage
)