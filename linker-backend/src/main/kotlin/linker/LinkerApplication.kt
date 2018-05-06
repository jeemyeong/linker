package linker

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class LinkerApplication

fun main(args: Array<String>) {
    runApplication<LinkerApplication>(*args)
}
