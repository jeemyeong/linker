package linker.dto

import linker.enum.ResponseStatus

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 27/05/2018
 * Time: 2:38 PM
 */
data class BoardResponse (
        override val status: ResponseStatus = ResponseStatus.SUCCESS,
        var board: BoardDto
): CommonResponse