package linker.dto

import linker.enum.ResponseStatus

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 13/05/2018
 * Time: 6:26 PM
 */

data class DeleteLinkResponse (
        override val status: ResponseStatus = ResponseStatus.SUCCESS,
        var link: LinkDto
) : CommonResponse