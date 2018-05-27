package linker.dto

import linker.enum.ResponseStatus

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 27/05/2018
 * Time: 3:00 PM
 */
data class LinkListResponse (
        override val status: ResponseStatus = ResponseStatus.SUCCESS,
        var links: List<LinkDto>
): CommonResponse