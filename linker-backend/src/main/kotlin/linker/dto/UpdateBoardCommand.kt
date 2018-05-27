package linker.dto

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 27/05/2018
 * Time: 7:38 PM
 */
data class UpdateBoardCommand(
        val categories: List<CategoryDto>,
        val email: String
)