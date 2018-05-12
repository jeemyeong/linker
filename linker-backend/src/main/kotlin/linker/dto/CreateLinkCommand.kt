package linker.dto

import linker.entity.Category
import linker.entity.Link

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:45 PM
 */
data class CreateLinkCommand(
        val url: String,
        val content: String,
        val categoryId: Long,
        val email: String
)

fun CreateLinkCommand.toDomain(category: Category, order: Int): Link = Link(
        url = url,
        content = content,
        category = category,
        order = order
)