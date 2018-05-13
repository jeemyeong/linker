package linker.pojo

import org.springframework.http.HttpStatus



/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 13/05/2018
 * Time: 9:10 PM
 */
class ApiError (
        val status: HttpStatus,
        val message: String,
        val error: List<String>
)