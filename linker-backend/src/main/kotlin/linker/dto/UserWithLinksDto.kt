package linker.dto

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:45 PM
 */
data class UserWithLinksDto(
        val user: UserDto,
        val links: List<LinkDto>
)
