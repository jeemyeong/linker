package linker.dto

import linker.entity.Category
import linker.entity.Link
import linker.entity.User
import linker.pojo.PageHeaderInfo

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:45 PM
 */
data class CreateLinkCommand(
        var url: String,
        var content: String,
        var order: Int,
        val categoryId: Long,
        val email: String
) {
    fun toDomain(category: Category, order: Int, pageHeaderInfo: PageHeaderInfo, user: User): Link = Link(
        url = url,
        content = content,
        category = category,
        ogTitle = pageHeaderInfo.ogTitle,
        ogImage = pageHeaderInfo.ogImage,
        ogDescription= pageHeaderInfo.ogDescription,
        order = order,
        user = user
    )
}
