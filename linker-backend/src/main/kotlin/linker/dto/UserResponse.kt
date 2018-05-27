package linker.dto

import linker.enum.ResponseStatus

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 27/05/2018
 * Time: 3:02 PM
 */
data class UserResponse (
        override val status: ResponseStatus = ResponseStatus.SUCCESS,
        var user: UserDto
): CommonResponse