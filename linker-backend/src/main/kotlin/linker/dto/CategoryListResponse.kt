package linker.dto

import linker.enum.ResponseStatus

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 27/05/2018
 * Time: 2:55 PM
 */
data class CategoryListResponse (
        override val status: ResponseStatus = ResponseStatus.SUCCESS,
        var categories: List<CategoryDto>
): CommonResponse