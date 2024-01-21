tasks {
    listOf("42", "45").forEach { version ->
        register<Copy>(version) {
            from(version)

            into(layout.buildDirectory.dir(version))
        }

        register<Zip>("extension-$version") {
            from(version)

            archiveBaseName = "shyriiwook@madhead.me"
            destinationDirectory = layout.buildDirectory.dir("dist/$version")
        }
    }

    register("clean") {
        delete("build")
    }
}
