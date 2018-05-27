package linker.enum

import com.fasterxml.jackson.annotation.JsonValue

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 27/05/2018
 * Time: 2:24 PM
 */
enum class ResponseStatus(private val status: Int) {
    SUCCESS(0);

    @JsonValue
    fun getStatus(): String = status.toString()
}