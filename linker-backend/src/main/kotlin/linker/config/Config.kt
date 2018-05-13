package linker.config

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.InjectionPoint
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Scope
import org.springframework.web.client.RestTemplate

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 13/05/2018
 * Time: 7:20 PM
 */
@Configuration
class Config {
    @Bean
    fun getRestTemplate() = RestTemplate()

    @Bean
    @Scope("prototype")
    fun logger(injectionPoint: InjectionPoint) : Logger {
        return LoggerFactory.getLogger(injectionPoint.methodParameter?.containingClass)
    }
}