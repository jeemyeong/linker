package linker.dto

import linker.entity.Link
import linker.pojo.PageHeaderInfo

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:45 PM
 */
data class CreateLinkCommand(
        val link: LinkDto,
        val email: String
)

fun CreateLinkCommand.toDomain(order: Int, pageHeaderInfo: PageHeaderInfo): Link = Link(
        url = link.url,
        content = link.content,
        category = link.category.toDomain(),
        ogTitle = pageHeaderInfo.ogTitle,
        ogImage = pageHeaderInfo.ogImage,
        order = order
)