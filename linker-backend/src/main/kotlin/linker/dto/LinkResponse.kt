package linker.dto

import linker.enum.ResponseStatus

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 27/05/2018
 * Time: 2:59 PM
 */
data class LinkResponse (
        override val status: ResponseStatus = ResponseStatus.SUCCESS,
        var link: LinkDto
): CommonResponse