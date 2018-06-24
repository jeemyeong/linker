package linker.infra.rest

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpEntity
import org.springframework.http.HttpMethod
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 14/06/2018
 * Time: 12:54 AM
 */

@Component
class RestManager {
    @Autowired
    lateinit var restTemplate: RestTemplate

    protected operator fun <T> get(url: String, clazz: Class<T>): ResponseEntity<*>? {
        return restTemplate.getForEntity(url, clazz)
    }

    protected fun <T, R> execute(url: String, method: HttpMethod, entity: HttpEntity<R>, clazz: Class<T>): ResponseEntity<T> {
        return restTemplate.exchange(url, method, entity, clazz)
    }
}