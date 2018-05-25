package linker.dto

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 25/05/2018
 * Time: 10:39 PM
 */

data class LinkIdWithLong(
        var id: Long,
        var order: Int,
        var categoryId: Long
)

data class ReorderLinkCommand(
        val links: Collection<LinkIdWithLong>,
        val email: String
)