package linker.dto

import linker.enum.ResponseStatus

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 27/05/2018
 * Time: 3:03 PM
 */
data class UserListResponse (
        override val status: ResponseStatus = ResponseStatus.SUCCESS,
        var users: List<UserDto>
): CommonResponse