package linker.dto

import linker.enum.ResponseStatus

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 27/05/2018
 * Time: 2:52 PM
 */
data class CategoryResponse (
        override val status: ResponseStatus = ResponseStatus.SUCCESS,
        var category: CategoryDto
): CommonResponse