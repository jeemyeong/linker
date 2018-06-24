package linker.infra.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.client.RestTemplate

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 13/06/2018
 * Time: 11:51 PM
 */

@Configuration
class RestTemplateConfig {
    @Bean
    fun getRestTemplate() = RestTemplate()
}