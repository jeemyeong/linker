package linker.dto

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 13/05/2018
 * Time: 6:26 PM
 */

data class SuccessDeleteLinkResponse (
        val status: Long = 0,
        var link: LinkDto
) {
    companion object {
        fun fromLinkDto(link: LinkDto): SuccessDeleteLinkResponse = SuccessDeleteLinkResponse(link = link)
    }
}