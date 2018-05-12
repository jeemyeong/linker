package linker.dto

import linker.entity.Link

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

fun CreateLinkCommand.toDomain(order: Int): Link = Link(
        url = link.url,
        content = link.content,
        category = link.category.toDomain(),
        order = order
)