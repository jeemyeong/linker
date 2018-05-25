package linker.entity

import javax.persistence.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 25/05/2018
 * Time: 9:17 PM
 */
@Entity
@Table(name = "boards")
data class Board (
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0,
        var title: String,
        @field:ManyToOne(targetEntity = User::class)
        @field:JoinColumn(name = "user_id")
        var user: User
)