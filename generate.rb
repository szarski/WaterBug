require 'erb'

JS_ESCAPE_MAP = {"\""=>"\\\"", "\r"=>"\\n", "\\"=>"\\\\", "'"=>"\\'", "\r\n"=>"\\n", "</"=>"<\\/", "\n"=>"\\n"}

def render(options={})
  template_name = options.delete(:template)
  path = File.join(File.dirname(__FILE__), 'templates', template_name)
  template_content = []
  File.open(path, "r") do |file|
    until file.eof?
      template_content << file.gets
    end
  end
  result =  ERB.new(template_content.join).result(binding)
  return result
end

def write_file(name, content)
  puts "writing #{name}:"
  puts content
  path = File.join(File.dirname(__FILE__), 'generated', name)
  File.open(path, "w") do |file|
    file.write(content)
  end
end

def escape_javascript(string)
  string.gsub(/(\\|<\/|\r\n|[\n\r"'])/) { JS_ESCAPE_MAP[$1] }
end

write_file('waterbug.js', render(:template => "waterbug.js"))
